const axios = require('axios');

const getMunicipalities = async () => {
    return await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');
}

module.exports = getMunicipalities;