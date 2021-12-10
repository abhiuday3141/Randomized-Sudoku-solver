# Randomized-Sudoku-solver

Traditional Sudoku is solved by a computer using the backtracking algorithm. In this algorithm every digit from 1-9 is tried at the blank spaces until a solution is reached. Since the digits are tried sequentially there is high chance that it will be very slow in cases where the blank spaces had to contain the higher order digits such as 5,6,7,8,9. This is because it will take at least 5 tries to get it correct resulting in higher number of function calls.
Also, we can design a sudoku deliberately in way to slow down this backtracking algorithm because of running the algorithm in a sequential manner
In this project we have proposed a solution to counter the above problem and to avoid the bias created by the sequential order and which no sudoku can predictively slow down.

Rather than trying the digits in sequential order we have tried the digits in a random order. This helps in cases where the actual digit that has to occupy its place is tried first.
Hence to do the above we break the problem into 2 steps
1)	Generate a random order where the digits don’t repeat and cause infinite loops
2)	Try this random order without increasing the function calls

In the codes provided I have done exactly what is mentioned above
The improved version is not only fast but also prevents slowing down on certain cases
