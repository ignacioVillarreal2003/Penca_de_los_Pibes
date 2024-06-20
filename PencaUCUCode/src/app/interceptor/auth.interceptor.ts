import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storedData = localStorage.getItem('token');
  let token = "TokenGenericoDeUsuario";
  if (storedData) {
    token = storedData
  }
  const authorization = `Bearer ${token}`;
  const modifiedRequest = req.clone({
    headers: req.headers.set('Authorization', authorization),
  });
  return next(modifiedRequest);
};
