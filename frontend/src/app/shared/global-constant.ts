export class globalConstant {
  public static generelError: string = 'Something went wrong!';

  public static nameError: string = '[a-zA-Z0-9 ]*';

  public static emailError: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  public static contactNumberError: string = '^[e0-9]{10,10}$';

  public static error: string = 'error';

  public static unauthorize: string =
    'You are not authorized to visit this page.';
}
