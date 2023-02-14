/* eslint-disable */
export default function dynamicMask(maskit: any, masks: any, tokens: any) {
  let sortedMasks = Array.from(masks).sort((a: any, b: any) => a.length - b.length)
  return function(value: any, mask: any, masked = true) {
    let i = 0
    while (i < sortedMasks.length) {
      let currentMask: any = sortedMasks[i]
      i++
      let nextMask = sortedMasks[i]
      if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
        return maskit(value, currentMask, masked, tokens)
      }
    }
    return ''
  }
}
