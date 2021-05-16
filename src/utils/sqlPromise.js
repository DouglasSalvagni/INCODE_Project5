module.exports = (connection, sql, params) => {

    if(!params) {


        return new Promise((resolve, reject) => {
    
            connection.query(sql, (err, result) => {

                if(err) return reject(err);

                return resolve(result);

            })

        });

    } else {

        return new Promise((resolve, reject) => {
    
            connection.query(sql, params, (err, result) => {

                if(err) return reject(err);

                return resolve(result);

            })

        });

    }


}