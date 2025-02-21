export interface ValidatorStrategy {
  validate(file?: File): Promise<boolean>;
}
