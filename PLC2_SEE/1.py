import shelve 
with shelve.open("data_store") as db: 
    db["name"] = "Chethan" 
    db["age"] = 18  
with shelve.open("data_store") as db: 
    print(db["name"])   
    print(db["age"])  