/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line prettier/prettier
/* eslint-disable no-unused-vars */

console.time('test1')
const data = {
  dwadwadwanogfnogeoggk: {
    type: 'brackets',
    input1: 'paranm',
    input2: 'Type',
    input3: 'Description',
    input4: 'api_key',
    input5: 'string',
    spec6: 'Required',
    input6: 'Your API key',
    order: 2
  },
  dwaghthtjykytktkytkytktyytyjt: {
    type: 'brackets',
    input1: 'Parameter',
    input2: 'Type',
    input3: 'Description',
    input4: 'api_key',
    input5: 'string',
    spec6: 'Required',
    input6: 'Your API key',
    order: 1
  }
}

const api_key_test = '`' + data.dwaghthtjykytktkytkytktyytyjt.input6 + '`'
console.log(api_key_test)

const reqi = '**' + data.dwadwadwanogfnogeoggk.spec6 + '**'
console.log(reqi)

const string1 = `| ${data.dwadwadwanogfnogeoggk.input1} | ${data.dwadwadwanogfnogeoggk.input2}     | ${data.dwadwadwanogfnogeoggk.input3}                | :-------- | :------- | :------------------------- | ${api_key_test} | ${data.dwadwadwanogfnogeoggk.input5} | ${reqi}. ${data.dwadwadwanogfnogeoggk.input6} |`
console.log(string1)

console.timeEnd('test1')

/*
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
*/

console.time('test2')

const data2 = {
  dwadwadwanogfnogeoggk: {
    type: 'brackets',
    inputs: {
      input1: 'Parameter',
      input2: 'Type',
      input3: 'Description',
      input4: 'api_key',
      input5: 'string',
      spec6: 'Required',
      input6: 'Your API key'
    },
    order: 2
  },
  dwaghthtjykytktkytkytktyytyjt: {
    type: 'brackets',
    inputs: {
      input1: 'Parameter',
      input2: 'Type',
      input3: 'Description',
      input4: 'api_key',
      input5: 'string',
      spec6: 'Required',
      input6: 'Your API key'
    },
    order: 1
  }
}

function createString(entry) {
  const inputs = entry.inputs
  return `| ${inputs.input1} | ${inputs.input2} | ${inputs.input3} |  |:-------- | :------- | :------------------------- | | \`${inputs.input6}\` | ${inputs.input5} | **${inputs.spec6}**. ${inputs.input6} |`
}

Object.values(data2).forEach((entry) => {
  console.log(createString(entry))
})

console.timeEnd('test2')
