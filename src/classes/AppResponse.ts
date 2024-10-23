export class AppResponse<T>{
  constructor(
    public ok: boolean,
    public result?: T,
    public message?: string
    ) {}
}