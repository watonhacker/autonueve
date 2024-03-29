const pagination = require('pagination');
const mysqlPool = require('../database/database')
const categoriesControllers = require('../controllers/categories.controller')

exports.getElementsByPage = (results, limit) => {


    let dataPerPage = limit;
    let localCounter = 0;
    let rounds = results.length / dataPerPage
    let localList = []
    let globalList = []
    let globalCounter = 0
    
    
    
    results.forEach(data => {
    
      if (rounds >= 1) {
    
        if (localCounter < dataPerPage-1) {
    
          localList.push(data)
          localCounter++
      
        } else {
          localList.push(data)
          globalList.push(localList)
          localList = []
          rounds -= 1
          localCounter = 0
    
        }
      } else {
    
        
        if (globalCounter+1 < results.length) {
          localList.push(data)
    
        } else {
          localList.push(data)
          globalList.push(localList)
          localList = []
        }
        
      }
      globalCounter ++
    })
    

    return globalList
    


}

exports.boostrapPaginator = (type, searchObject, page, total) => {


  let url;
  let search = searchObject.data;

  if (type === 'search') {
    url = `/search/${search}/`;
  } else if (type === 'category') {
    url = `/categories/${search}/`;
  } else {
    url = `/search/compatibilidad/${type}/`
  }

    return new pagination.TemplatePaginator({
        prelink:`${url}`, current: `${page}`, rowsPerPage: 12,
        totalResult: total, slashSeparator: false,
        template: function(result) {
            var i, len, prelink;
            var html = '<div><ul class="pagination custom-pagination">';
            if(result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            prelink = this.preparePreLink(result.prelink);
            if(result.previous) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + 'Atrás' + '</a></li>';
            }
            if(result.range.length) {
                for( i = 0, len = result.range.length; i < len; i++) {
                    if(result.range[i] === result.current) {
                        html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if(result.next) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + 'Siguiente' + '</a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    })
};

exports.globalSearch = (busqueda, page) => {
  const sql = `SELECT * FROM producto WHERE producto.nombre LIKE '%${busqueda}%' AND producto.estado="A";`;

  console.log(sql)
    
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection((err, connection) => {
      if (err) { 
          console.error(err) 
          
      }
      connection.query(sql, (err, result) => {
          if (err) { 
              console.error(err) 
              
          }
          connection.release(); // Importante liberar la conexión
          const results=JSON.parse(JSON.stringify(result))
          resolve(categoriesControllers.getElementsByPageRender('search', {data:busqueda}, results, page))
      })
  })


  })
}