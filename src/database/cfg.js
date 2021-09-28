module.exports = {
    host:'uh1.hnc.cl',
    user:'mobalzen_keyzen',
    password:'keyzencl123',
    database:'mobalzen_autonueve',
    port:'3306',

    //DEfinimos los datos para jwt
    jwtSecreto : 'secretito',
    //Tiempo que expira el token
    jwtTiempoExpira : '7d',
    //Tiempo q expira la cookie
    jwtCookieExpires : 90
}