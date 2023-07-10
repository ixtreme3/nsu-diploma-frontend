import json

from flask import Flask, request
from rdflib import Graph
from flask_cors import CORS

g = Graph()
g.parse('C:/Users/ixtre/Desktop/Organizational ontology.ttl')

app = Flask(__name__)
CORS(app)


# возвращает список всех рабочих пространств (т.е. список всех сущностей модели)
@app.route('/getAllWorkspaces', methods=['GET'])
def getAllWorkspaces():
    result = g.query("""
        SELECT ?workspaceName
        WHERE {
             ?workspace rdf:type :Workspace .
             ?workspace rdfs:label ?workspaceName
        }
    """)
    data = []
    for row in result:
        data.append({"workspaceName": f"{row.workspaceName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает список всех отделов организации
@app.route('/getAllUnits', methods=['GET'])
def getAllUnits():
    result = g.query("""
        SELECT ?unitName
        WHERE {
             ?workspace :workspaceType :Отдел .
             ?workspace rdfs:label ?unitName
        }
    """)
    data = []
    for row in result:
        data.append({"unitName": f"{row.unitName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает список всех сотрудников организации
@app.route('/getAllEmployees', methods=['GET'])
def getAllEmployees():
    result = g.query("""
        SELECT ?employeeName
        WHERE {
             ?workspace rdf:type :Workspace .
             ?workspace :workspaceType :Сотрудник .
             ?workspace rdfs:label ?employeeName
        }
    """)
    data = []
    for row in result:
        data.append({"employeeName": f"{row.employeeName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает список всех сотрудников УКАЗАННОГО отдела
@app.route('/getUnitStaff', methods=['POST'])
def getUnitStaff():
    unit_name = request.json['unit_name'].title().replace(' ', '')
    result = g.query(f"""
        SELECT ?employeeName
        WHERE {{
            :{unit_name}  ^:relationWorkspaceLink ?relation .
            ?relation :relationType :ЯвлятьсяЧленом .
            ?relation ^:workspaceRelationLink ?employee .
            ?employee rdfs:label ?employeeName
        }}
    """)
    data = []
    for row in result:
        data.append({"employeeName": f"{row.employeeName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает имя сотрудника с УКАЗАННОЙ должностью
@app.route('/getEmployeeByPost', methods=['POST'])
def getEmployeeByPost():
    post_name = request.json['post_name'].title().replace(' ', '')

    result = g.query(f"""
        SELECT ?employeeName
        WHERE {{
            :{post_name} ^:relationWorkspaceLink ?relation .
            ?relation :relationType :ЗаниматьДолжность .
            ?relation ^:workspaceRelationLink ?employee .
            ?employee rdfs:label ?employeeName
        }}
    """)
    data = []
    for row in result:
        data.append({"employeeName": f"{row.employeeName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает должность и отдел УКАЗАННОГО сотрудника
@app.route('/getEmployeePostAndUnit', methods=['POST'])
def getEmployeePostAndUnit():
    employee_name = request.json['employee_name'].title().replace(' ', '')

    result1 = g.query(f"""
        SELECT ?postName ?unitName 
        WHERE {{
            :{employee_name} :workspaceRelationLink ?relationA .
            ?relationA :relationType :ЗаниматьДолжность . 
            ?relationA :relationWorkspaceLink ?post .
            ?post rdfs:label ?postName .
            ?post :workspaceRelationLink ?relationB .
            ?relationB :relationType :ЯвлятьсяЧленом .
            ?relationB :relationWorkspaceLink ?unit .
            ?unit rdfs:label ?unitName
        }}
    """)

    result2 = g.query(f"""
        SELECT ?postName ?unitName 
        WHERE {{
            :{employee_name} :workspaceRelationLink ?relationA .
            ?relationA :relationType :ЗаниматьДолжность . 
            ?relationA :relationWorkspaceLink ?post .
            ?post rdfs:label ?postName .
            ?post :workspaceRelationLink ?relationB .
            ?relationB :relationType :ЯвлятьсяГлавой .
            ?relationB :relationWorkspaceLink ?unit .
            ?unit rdfs:label ?unitName
        }}
    """)
    data = []
    for row in result1:
        data.append({"postName": f"{row.postName}"})
        data.append({"unitName": f"{row.unitName}"})
    for row in result2:
        data.append({"postName": f"{row.postName}"})
        data.append({"unitName": f"{row.unitName}"})

    print(data)  # to delete
    return json.dumps(data)


# возвращает вышестоящую должность для УКАЗАННОЙ должности
@app.route('/getPostHead', methods=['POST'])
def getPostHead():
    post_name = request.json['post_name'].title().replace(' ', '')

    result = g.query(f"""
        SELECT ?headPostName
        WHERE {{
            :{post_name} :workspaceRelationLink ?relation .
            ?relation :relationType :Подчиняться .
            ?relation :relationWorkspaceLink ?head .
            ?head rdfs:label ?headPostName
        }}
    """)
    data = []
    for row in result:
        data.append({"headPostName": f"{row.headPostName}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает поддерживаемые операции УКАЗАННОЙ организационной единицы
@app.route('/getUnitSupportedOperations', methods=['POST'])
def getUnitSupportedOperations():
    unit_name = request.json['unit_name'].title().replace(' ', '')

    result = g.query(f"""
        SELECT ?operationsString
        WHERE {{
            :{unit_name} :supports ?operations .
            ?operations :basicOperations ?operationsString
        }}
    """)
    data = []
    for row in result:
        for operation in row.operationsString.split(','):
            data.append({"operation": f"{operation}"})
    print(data)  # to delete
    return json.dumps(data)


# возвращает бизнес-правила УКАЗАННОЙ организационной единицы
@app.route('/getUnitBusinessRules', methods=['POST'])
def getUnitBusinessRules():
    unit_name = request.json['unit_name'].title().replace(' ', '')

    first_query_res = g.query(f"""
        SELECT ?label ?value
        WHERE {{
            :{unit_name} :hasLimitations ?businessRules .
            ?businessRules ?relation ?value .
            ?relation rdfs:range xsd:integer .
            ?relation rdfs:label ?label
        }}
    """)
    second_query_res = g.query(f"""
        SELECT ?openTime ?closeTime ?day
        WHERE {{
            :{unit_name} :hasLimitations ?businessRules .
            ?businessRules gr:hasOpeningHoursSpecification [ gr:opens ?openTime ;
                                                             gr:closes ?closeTime ; 
                                                             gr:hasOpeningHoursDayOfWeek ?day 
                                                            ] 
        }}
    """)
    numeric_params = {}
    for row in first_query_res:
        numeric_params[f"{row.label}"] = f"{row.value}"

    data = [numeric_params]
    for row in second_query_res:
        data.append({"dayOfWeek": f"{row.day}".split("#")[1], "time": f"{row.openTime + '-' + row.closeTime}"})

    print(data)  # to delete
    return json.dumps(data)


# возвращает местоположение УКАЗАННОЙ организационной единицы
@app.route('/getEntityLocation', methods=['POST'])
def getEntityLocation():
    entity_name = request.json['entity_name'].title().replace(' ', '')
    result = g.query(f"""
        SELECT ?locationType ?locationName 
        WHERE {{
            :{entity_name} :workspaceRelationLink ?relation .
            ?relation :relationType :Располагаться . 
            ?relation :relationWorkspaceLink ?start .
            ?start (:workspaceRelationLink/:relationWorkspaceLink)* ?intermediate .
            ?intermediate :workspaceType ?placeNode .
            ?placeNode :placeType ?placeTypeNode .
            ?placeTypeNode rdfs:label ?locationType .
            ?intermediate rdfs:label ?locationName
        }}
    """)
    data = []
    for row in result:
        data.append({f"{row.locationType}": f"{row.locationName}"})
    print(data)  # to delete
    return json.dumps(data)


if __name__ == '__main__':
    app.run()
