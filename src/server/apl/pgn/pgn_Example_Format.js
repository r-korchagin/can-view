module.exports = {
 'PGN':[
        {
            id:"ACFF", //0C ACFF 13
            SPN:[
                {
                    SPN:'256',
                    Name:'asdasda',
                    range:'4-5.1',
                    size:15,
                    resolution: 0.5,
                    offset: -20,
                    description:'L/km'
                },
                {
                    SPN:'250',
                    Name:'speed',
                    range:'4-5.1',
                    size:10,
                    resolution: 0.5,
                    offset: -20,
                    description:'km/h'
                }
            ]
        },
        {
            id:"FEE6", //0C ACFF 13
            SPN:[
                {
                    SPN:'356',
                    Name:'FUEL LEVEL',
                    range:'4-5.1',
                    size:15,
                    resolution: 0.5,
                    offset: -20,
                    description:'L'
                },
                {
                    SPN:'250',
                    Name:'speed',
                    range:'4-5.1',
                    size:10,
                    resolution: 0.5,
                    offset: -20,
                    description:'km/h'
                }
            ]
        }
    ]
};
