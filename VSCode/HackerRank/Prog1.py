def equalize_array_with_xor(arr):
    if len(arr) <= 1:
        return True

    xor_sum = 0
    for num in arr:
        xor_sum ^= num

    return xor_sum == 0

arr1 = [1, 2, 3, 1, 2, 3]  
arr2 = [1, 2, 3, 1, 2] 

print(f"Array 1 can be equalized: {equalize_array_with_xor(arr1)}")
print(f"Array 2 can be equalized: {equalize_array_with_xor(arr2)}")