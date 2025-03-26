#include <stdio.h>

int main() {
    int n;
    printf("Enter the number: ");  // Fixed: Changed ' to "
    scanf("%d", &n);               // Fixed: Changed ' to "

    int i = 1;
    
    while (i < n) {  
        printf("%d\n", i*2);         // Fixed: Changed ' to "
        i++;
    }

    return 0;
}
