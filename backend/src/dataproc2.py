import csv

classTags = {}

with open("./src/courses.csv", "r") as f:

    reader = csv.reader(f)
    next(reader)  # Skip header

    with open("./src/classTags.json", "w") as f2:
        f2.write("{\n")
        for row in reader:
            # Select "classTag" column
            ct = row[0]
            if ct not in classTags:
                classTags[ct] = 1
            else:
                classTags[ct] += 1

        for ct in classTags:
            f2.write(f'  "{ct}": {classTags[ct]},\n')

        f2.write("}")
