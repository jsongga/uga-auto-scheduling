import csv
import json

classTags = {}

with open("./src/courses.csv", "r") as f:

    reader = csv.reader(f)
    next(reader)  # Skip header

    for row in reader:
        # Select "classTag" column
        ct = row[0]
        if ct not in classTags:
            classTags[ct] = 1
        else:
            classTags[ct] += 1

    # Convert keys to list
    classTags = list(classTags.keys())

    with open("./src/classTags.json", "w") as f2:
        json.dump(classTags, f2)
