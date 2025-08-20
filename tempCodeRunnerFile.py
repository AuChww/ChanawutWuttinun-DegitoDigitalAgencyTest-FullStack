over_value = max_value - current_value
for i in range(len(sheep)) :
    for j in range(len(sheep)) :
        if over_value - (sheep[i] + sheep[j]) == 0 :
            sheep.remove(i)
            sheep.remove(j)
            print(f"{sheep}")
            break