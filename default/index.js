var rsync = require('rsync');

module.exports = {
    init: function() {
        var defaultFolderTransfer = new rsync()
        .shell('ssh')
        .flags('vcr')
        .source('default/assets')
        .destination('../../');
    }
}
