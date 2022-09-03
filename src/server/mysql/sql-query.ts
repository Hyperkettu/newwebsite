import { DatabaseRequest } from "../../client/types/database-request.type";
import { UpdateRequest } from "../types/packet";

enum MySqlQueryIndex {
    UPDATE = 0,
    CREATE,
    READ,
    DELETE,
    NUM_INDICES
}

const sqlQueryTable: string[] = [
    'UPDATE Weights SET weight = {weight}, date = date WHERE id = {id};',
    'INSERT INTO Weights (weight) VALUES ( {weight} );',       
    'SELECT * FROM Weights ORDER BY Date DESC;',
    'DELETE FROM Weights WHERE id = {id}'
];

function getMySqlQueryParameters(query: string) {
    let temp = query;
    const parameters: string[] = [];
    let startIndex = -1;
    let endIndex = -1;
    do {
        startIndex = temp.indexOf('{');
        endIndex = temp.indexOf('}');
        const param = temp.substring(startIndex + 1, endIndex);
        if(param.length > 0) {
            parameters.push(param);
        }
        temp = temp.substring(endIndex + 1);
    } while(startIndex != -1);
    
    return parameters;
}

export function getMySqlQuery(request: DatabaseRequest, data: UpdateRequest) {
    let index = -1;
    switch(request) {
        case 'update': 
            index = MySqlQueryIndex.UPDATE;
            break;
        case 'create':
            index = MySqlQueryIndex.CREATE;
            break;
        case 'read':
            index = MySqlQueryIndex.READ;
            break;
        case 'delete':
            index = MySqlQueryIndex.DELETE;
            break;
    }
    let query = sqlQueryTable[index];
    const params = getMySqlQueryParameters(query);
    for(let variable of params) {
        query = query.replace(`{${variable}}`, `${data[variable]}`)
    }
    return query;
}