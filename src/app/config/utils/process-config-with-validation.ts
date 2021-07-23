export const processWithValidation = <T>(config: T extends object ? T : {}, ...validators: ((arg: T) => any)[]) => {

}
