import csv

# Specify the path to your CSV file
csv_file_path = './src/courses.csv'
out_path = './src/courses.json'
out_file = open(out_path, 'w')

# Open the CSV file
with open(csv_file_path, mode='r', newline='') as file:
    # Create a DictReader object
    csv_reader = csv.DictReader(file)
    
    # Access the header row
    header = csv_reader.fieldnames
    
    # Iterate over each row in the CSV file
    print('{', file = out_file)

    cnt = 0
    for row in csv_reader:
        cnt += 1
        bruh = '\"' + (str)(cnt) + '\"'
        print('\t' + bruh + ': {', file = out_file)
        print('\t\t\"courseNumber\": \"' + row['COURSE NUMBER'] + '\",', file = out_file)
        print('\t\t\"courseName\": \"' + row['COURSE NAME'] + '\",', file = out_file)
        print('\t\t\"crn\": ' + row['CRN'] + ',', file = out_file)
        print('\t\t\"instructor\": \"' + row['INSTRUCTOR'] + '\",', file = out_file)
        print('\t\t\"days\": \"' + row['DAYS'] + '\",', file = out_file)
        print('\t\t\"time\": \"' + row['TIME'] + '\",', file = out_file)
        print('\t\t\"building\": \"' + row['BUILDING'] + '\",', file = out_file)
        print('\t\t\"room\": \"' + row['ROOM'] + '\",', file = out_file)
        print('\t\t\"seatsAvailable\": ' + row['SEATS AVAILABLE'], file = out_file)
        print('\t},', file = out_file)

    print('}', file = out_file)
