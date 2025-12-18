function sendCommand(commandID, params = {}, cb = () => { }) {
    let queryString = $.param(params);
    let url = baseURL + '/' + commandID + '?' + queryString;
    $.post(url, function (data) {
        console.log(data);
        if (data.error) return cb(data.error, undefined)
        else return cb(false, data.message);
    });
}

function showNotification(backgroundColor, text) {
    Snackbar.show({ text, backgroundColor, pos: 'top-right', showAction: false });
}

function updateButton(element, commandID, additionalParams = {}) {
    $(element).addClass('loading');
    sendCommand(commandID, additionalParams, (error, message) => {
        if (error) {
            setTimeout(() => {
                showNotification('#f03434', error)
                $(element).removeClass('loading')
            }, 300)
        } else {
            // Increased timeout to 4000ms (4 seconds) to allow device time to process request
            setTimeout(() => {
                showNotification('#2ecc71', 'Update Requested! Please wait...');
                setTimeout(() => {
                    showNotification('#2ecc71', message);
                    $(element).removeClass('loading');
                    if (message === 'Requested') {
                        const cmd = commandID;
                        if (cmd !== '0xSP') setTimeout(() => { window.location = window.location }, 200)
                    }
                }, 4000); 
            }, 300)
        }
    });
}
