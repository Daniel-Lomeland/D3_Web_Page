import pandas as pd
import pymysql
from sqlalchemy import create_engine
import json

def s_data():
    #________________SQL Querry____________________________________________________________________
    engine = create_engine('mysql+pymysql://b3e3f4a1ff2684:0a88bed9@us-cdbr-iron-east-03.cleardb.net/heroku_fd48420af727b24')
    q1= pd.read_sql_query('Select * from v_animalbreed_cnt;', engine)
    q2= pd.read_sql_query('Select * from v_animaloutcome_cnt;', engine)
    #________________Create Nodes List____________________________________________________________
    # Rename columns of df2
    df3 = q1.rename( columns= {"breed_name":"name","animal_type_name": "node"})
    df3['node']= df3.index
    df3 = df3[['name','node']]
    # Rename columns of df2
    df4 = q2.rename( columns= {"ANIMAL_TYPE_NAME":"node","outcome_type_name": "name"})
    # Create Target Values
    df4['node'] = df4.index + df3['node'].iloc[-1] +1
    df4 = df4[['name','node']]     
    df5 = pd.DataFrame([["Cat",(df4['node'].iloc[-1] +1)],["Dog",(df4['node'].iloc[-1] +2)]], columns=('name','node'))
    # Join data frames
    frames = [df3, df4, df5]
    nodes = pd.concat(frames)
    #______________Create list of  source, target and values______________________________________
    # rename colmnes of df1
    df1 = q1.rename( columns= {"breed_name":"source", "ANIMAL_TYPE_NAME": "target", "cnt":"value"})
    # Create Source Values
    df1['source']= df1.index
    # Rename columns of df2
    df2 = q2.rename( columns= {"ANIMAL_TYPE_NAME":"source","outcome_type_name": "target","cnt":"value"})
    # Create Target Values
    df2['target'] = df2.index + df1['source'].iloc[-1] +1
    # Join data frames
    frames = [df1, df2]
    links = pd.concat(frames, sort= False)
    
    # Replace Cat and Dog with target and value numbers
    links = links.replace({'source': 'Cat', 'target': 'Cat'}, links['target'].iloc[-1]+1)
    links = links.replace({'source': 'Dog', 'target': 'Dog'}, links['target'].iloc[-1]+2)
    
    #Convert ints to  to floats
    links['target']= links['target'].astype('float')
    links['source']= links['source'].astype('float')
    links['value']= links['value'].astype('float')

    #_________________Combine Lists into Dictionary _____________________________________
    data =  json.dumps({"links": links.to_dict("rows"), "nodes": nodes.to_dict("rows")})
    #load data
    data = json.loads(data)

    return(data)