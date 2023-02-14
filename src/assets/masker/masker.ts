/* eslint-disable */
import maskit from './maskit'
import dynamicMask from './dynamic-mask'

export default function(value: string | undefined, mask: string | Array<any>, masked = true, tokens: any) {
  if (!mask) {
    return value
  }
  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)(value, mask, tokens)
    : maskit(value, mask, masked, tokens)
}
