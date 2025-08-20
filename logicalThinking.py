sheep = [10, 13, 25, 30, 12, 18, 5, 7]
max_value = 120
real_value = 100
current_value = 0

for i in range(len(sheep)) :
    current_value = current_value + sheep[i]
    print(f"{current_value}")

over_value = max_value - real_value
for i in range(len(sheep)) :
    for j in range(i+1, len(sheep)) :
        if sheep[i] + sheep[j] == over_value:
            sheep = [x for x in sheep if x not in (sheep[i], sheep[j])]
            print(f"{sheep}")
            break
    else :
        continue
    break