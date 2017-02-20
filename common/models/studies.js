'use strict';
//var BriefSummaries = require('./brief-summaries')
module.exports = function(Studies) {
  
  Studies.Search = function (text, cb) {

        var ds = Studies.dataSource;
        var sql = "SELECT * FROM Studies WHERE brief_title ilike '%' || $1 || '%'";

        ds.connector.query(sql, [text], function (err, studies) {

            if (err) console.error(err);

            cb(err, studies);

        });

    };

    Studies.remoteMethod(
        'Search',
        {
            http: { verb: 'get' },
            description: 'Get search studies',
            accepts: { arg: 'text', type: 'string' },
            returns: { arg: 'data', type: ['Studies'], http: {path: "/:text"} }
        }
    );
};
