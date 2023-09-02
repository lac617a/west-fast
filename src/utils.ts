class Utils {
  private pattern_only_string = /^[A-Z a-z]+$/
  private pattern_only_number = /^[0-9]+$/

  isString(values: string): boolean {
    const value = this.pattern_only_string.test(values)
    return value
  }

  isNumber(values: string): boolean {
    const value = this.pattern_only_number.test(values)
    return value
  }

  classNames(...classes: (string | Boolean)[]) {
    return classes.filter(Boolean).join(' ')
  }
}

const utils = new Utils()

export default utils
