var prioritize = function(data, callback) {
    data.sort(function(a, b){
        return (new Date(a.changeDate)).getTime() - (new Date(b.changeDate)).getTime();
    });
    callback(data);
};

export { prioritize as default };
