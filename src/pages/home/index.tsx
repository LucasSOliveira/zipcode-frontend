import Input from "../../components/Input";
import Table from "../../components/Table";
import Button from "../../components/Button";
import api from "../../api";
import storage from "../../assets/utils/browserstorage";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  type ResultData = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    erro: boolean;
  };
  const headers = ["CEP", "Logradouro", "Complemento", "Bairro", "Localidade"];
  const invalidZipCodeList = [
    "00000000",
    "11111111",
    "22222222",
    "33333333",
    "44444444",
    "55555555",
    "66666666",
    "77777777",
    "88888888",
    "99999999",
  ];
  const [cep, setCep] = useState("");
  const [resultData, setResultData] = useState<ResultData | any>();
  const [hasValidResult, setHasValidResult] = useState(false)
  const [otherSearches, setOtherSearches] = useState<ResultData[]>([]);
  const [searchResults, setSearchResults] = useState<ResultData[]>([]);
  const [invalidFormatMessage, setInvalidFormatMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function copyData(field: string, data: string) {
    toast.dismiss("successcopy");
    try {
      await navigator.clipboard.writeText(data);
      toast.success(`${field} copiado!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "successcopy",
      });
    } catch (err) {
      toast.error(`Não foi possível copiar ${field.toLocaleLowerCase()}!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "successcopy",
      });
    }
  };

  function seveSearchResults(result: any) {
    const searchInResults = searchResults.find(item => item.cep === result.cep)

    if(!searchInResults) {
      const results = [result, ...searchResults ]

      setSearchResults(results);
      storage.set('zipcode', JSON.stringify(results))
    }
  }
  function getCepData(params: string) {
    setLoading(true);
    api.get(`?cep=${params}`)
      .then(({ data }: any) => {
        if (data.data.erro) {
          const errorParams = { cep: params, erro: true };

          seveSearchResults(errorParams)
          return Promise.reject('CEP não encontrado na base de dados!')
        }
        const { localidade, uf, ...rest } = data.data;
        const list = {
          localidade: `${localidade}/${uf}`,
          ...rest,
        }
        setOtherSearchesList();
        setResultData(list);
        seveSearchResults(list)
        setHasValidResult(true)
      })
      .catch((err) => {
        setInvalidFormatMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function searchZipCodeData() {
    setInvalidFormatMessage("");
    if(resultData?.cep === cep) {
      return null;
    }
    if (cep.length < 8) {
      setInvalidFormatMessage("O CEP deve conter 8 dígitos");
    } else if (invalidZipCodeList.includes(cep)) {
      setInvalidFormatMessage("CEP inválido");
    } else {
      const searchInResults = searchResults.find(item => item.cep === cep)
      if (!!searchResults.length && searchInResults?.erro) {
        setInvalidFormatMessage('CEP não encontrado na base de dados!');
      } else if (searchInResults) {
        setOtherSearchesList();
        setResultData(searchInResults);
        setHasValidResult(true);
      } else {
        setInvalidFormatMessage("")
        getCepData(cep) 
      }

    }
  }
  function setOtherSearchesList() {
    if (resultData && otherSearches?.every(({ cep }) => cep !== resultData.cep)) {
      const list = [resultData, ...otherSearches];
      const limitList = list.filter((item: ResultData, index) => index < 3)
      setOtherSearches(limitList);
    }
  }
  function clearSearches() {
    setOtherSearches([]);
    setResultData(undefined);
    setHasValidResult(false);
    setCep('')
  }
  useEffect(() => {
      const getSearchResultsInStorage = !!storage.get('zipcode') && JSON.parse(storage.get('zipcode'))

      if (getSearchResultsInStorage && !!getSearchResultsInStorage.length) {
        setSearchResults(getSearchResultsInStorage);
    }
  }, []);

  return (
    <>
      <main className={`${hasValidResult ? "" : "h-[95%]"}`}>
        <section
          className={`container flex flex-wrap ${
            hasValidResult
              ? "justify-between mt-12"
              : "items-center justify-center h-full"
          }`} >
          <div className={`w-full ${hasValidResult ? "md:w-5/12" : "md:w-3/5"}`}>
            <h1
              className={`font-family-02 w-full ${
                hasValidResult ? "text-7xl" : "text-6xl md:text-8xl"
              }`}>
              Zip<span className="text-color-secondary">Code</span>
            </h1>
            <div className={`${hasValidResult ? "pt-8" : ""}`}>
              <h2
                className={`${
                  hasValidResult ? "" : "text-5xl md:text-6xl md:w-[450px] py-8"
                }`}>
                Consulte {hasValidResult ? "outro" : "o"} endereço por
                <span className="text-color-secondary"> CEP</span>
              </h2>
              <Input
                mask="#####-###"
                masked={true}
                id="home-search-input"
                placeholder="Digite o CEP"
                className="w-full"
                type="text"
                name="cep"
                icon="search.svg"
                onChange={(e: string) => setCep(e)}
                value={cep}
                iconAction={searchZipCodeData}
                errorMessage={invalidFormatMessage}
                infoMessage={loading && '...Buscando dados do CEP!'}
                onKeyPress={(e: any) => e.key === "Enter" && searchZipCodeData()}
              />
            </div>
          </div>
          {hasValidResult && (
            <div className="min-h-full flex items-end max-md:w-full max-md:mt-2">
              <Button onClick={clearSearches} className="max-md:w-full">Limpar buscas</Button>
            </div>
          )}
        </section>
        {hasValidResult && (
          <section>
            <div className="container">
              <div className="mt-8">
                <h3 className="text-5xl mb-4">Resultado da busca</h3>
                <div className="flex flex-col md:flex-row w-full bg-[white] rounded-md border-solid border-2 p-6 flex justify-between">
                  {headers.map((header, index) => (
                    <div
                      className="sm:mb-2 md:mx-2 cursor-pointer"
                      onClick={() => resultData[header.toLocaleLowerCase()] && copyData(header, resultData[header.toLocaleLowerCase()])}
                      key={`frist-item-key-${index}`}>
                      <h4 className="text-[darkgray] text-[12px] md:text-[16px]">
                        {header}:
                      </h4>   
                      <h3 className={`${loading && 'animate-pulse bg-[#e3e3e3] text-[#e3e3e3] rounded-sm'}text-[16px] md:text-[18px] sm:text-bold`}>
                        {resultData[header.toLocaleLowerCase()] || "-"}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              {!!otherSearches.length && (
                <div className="mt-8">
                  <h3 className="text-5xl mb-4">Buscas anteriores</h3>
                  <Table headers={headers} bodyData={otherSearches} />
                </div>
              )}
            </div>
          </section>
        )}
        <ToastContainer containerId="home-toast-copy" />
      </main>
    </>
  );
};

export default Home;
