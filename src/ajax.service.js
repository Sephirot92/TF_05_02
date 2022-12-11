/*exported AjaxService */
function AjaxService() {
    function handleResponse(response, e, config) {
        if (response.readyState === 4) {
            let data = null;
            if (response.responseText && typeof response.responseText === "string") {
                data = JSON.parse(response.responseText);
            }
            if (response.status == 200) {
                config.success(data);
            } else {
                if (typeof config.error === "function") {
                    config.error(data, response, e);
                }
            }
        }
    }
    this.get = function (config) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function (e) {
            handleResponse(this, e, config);
        };
        xmlhttp.open("GET", config.url, true);
        xmlhttp.send();
    };
    this.post = function (config) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function (e) {
            handleResponse(this, e, config);
        };
        xmlhttp.open("POST", config.url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(config.data));
    };
}