import instance from "./request"

// 发起一个post请求
export const getNowPlayingData = (data) => {
   return instance({
       method: 'get',
       url: '/gateway',
       params: data,
       headers:{
         'X-Host': 'mall.film-ticket.film.list',
       }
   });
}

export const getDetailData = (data) => {
   console.log(data);
   return instance({
       method: 'get',
       url: '/gateway',
       params: data,
       headers:{
         //  获取第三方接口有不同的请求头
         'X-Host': 'mall.film-ticket.film.info',
       }
   });
}
export const getCinemalData = (data) => {
  // url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=2500238`,
   console.log(data);
   return instance({
       method: 'get',
       url: '/gateway',
       params: data,
       headers:{
         //  获取第三方接口有不同的请求头
         'X-Host': 'mall.film-ticket.cinema.list'
       }
   });
}
export const getCityData = () => {
  // url: `https://m.maizuo.com/gateway?k=2323064`,
   return instance({
       method: 'get',
       url: '/gateway?k=2323064',
       headers:{
         //  获取第三方接口有不同的请求头
         'X-Host': 'mall.film-ticket.city.list'
       }
   });
}

