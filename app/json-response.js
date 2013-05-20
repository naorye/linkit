var _ = require('underscore');

var JsonResponse = function(res) {
    this.res = res;
    this.res.contentType('json');

    this.buildResponse = _.bind(this.buildResponse, this);
};
_.extend(JsonResponse.prototype, {
    toResponse: function(payload) {
        this.res.send({
            'status': 'OK',
            'version': '1.0',
            'response': payload
        });
    },
    failResponse: function(error) {
        this.toResponse({error: error});
    },
    successResponse: function() {
        this.toResponse({success: true});
    },
    buildResponse: function(error, data) {
        if (error) {
            this.failResponse(error);
        } else if (data) {
            this.toResponse(data);
        } else {
            this.successResponse();
        }
    }
});

module.exports = JsonResponse;