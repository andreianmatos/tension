import pandas as pd
import glob

filename_list = glob.glob("C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\RESULTS\\*.txt")

writer = pd.ExcelWriter('C:\\Users\\Andreia Matos\\Desktop\\SCRIPT\\results.xlsx',  engine="openpyxl", mode="a", if_sheet_exists='replace')

path = 'results.xlsx'

file_number = 0
for filename in filename_list :
    with open(filename,"r") as file_handler :
        file_number += 1
        df = pd.read_csv(filename, index_col=0, header=None)
        print(file_number,df)
        df.T.to_excel(writer, sheet_name='User'+ str(file_number)) #transpose of the dataframe into the excel

writer.save()