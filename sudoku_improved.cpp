#include<bits/stdc++.h>
#include<chrono>
#include<ctime>
using namespace std;
using namespace std::chrono;
vector<int> m[81];
static int f=0;
bool canplace(int arr[][9],int i,int j,int digit,int n)
{
    //coloumn and row
   int x,y;
   for(int l=0;l<n;l++)
   {
       if(arr[l][j]==digit || arr[i][l]==digit)
       return false;
   }
   //grid

   x=(i/3)*3;
   y=(j/3)*3;
   int xend=x+sqrt(n);
   int yend=y+sqrt(n);
   for(int l=x;l<xend;l++)
   {
       for(int k=y;k<yend;k++)
       {  
           if(arr[l][k]==digit)
           return false;
       }
   }
   return true;
   
}
bool solvesudoku(int arr[9][9],int i,int j,int n)
{//base case
   if(i==n)
   { //cout<<"\t\t";
    // for(int k=0;k<n;k++)
    //    {
    //        for(int l=0;l<9;l++)
    //     {
    //         cout<<arr[k][l];
    //         if((l+1)%3==0)
    //             cout<<setw(5);
    //         else
    //             cout<<setw(3);
    //     }
    //     if((k+1)%3==0)
    //         cout<<"\n\n";
    //     else
    //         cout<<"\n";
    //    // cout<<"\t\t";
          
    //    }
       return true;
   }

if(j==n)
return solvesudoku(arr,i+1,0,n);

if(arr[i][j]!=0)
return solvesudoku(arr,i,j+1,n);

 
f++;
int digit;
for(int k=0;k<9;k++)
{
      digit=m[9*i+j][k];
       
       if(canplace(arr,i,j,digit,n))
       {   arr[i][j]=digit; 
         if(solvesudoku(arr,i,j+1,n)==true)
          return true;
          arr[i][j]=0;
        }
  
 }
   return false;
}
int main() {
 
    ios_base::sync_with_stdio(false);cin.tie(NULL);
   
   #ifndef ONLINE_JUDGE
   freopen("sudoku.txt", "r", stdin);
   freopen("output.txt", "w", stdout);
   #endif


    int n=9;
  int cnt=80;
    
 int val;
 int b[9];
 int mod;
  
          
    int sudoku[9][9];
    for(int i=0;i<9;i++)
    {srand(time(NULL));
        for(int j=0;j<9;j++)
        {
                val=i*9+j;
           mod=9;
        for(int i=0;i<9;i++)
        b[i]=i+1;
         while(mod>0)
         {
        int p=rand()%mod;
        m[val].push_back(b[p]);
        b[p]=b[mod-1];
        mod--;
         }
        
        }
    }

   auto start = high_resolution_clock::now();
while(cnt--)
{  
 for(int i=0;i<9;i++)
 {
    for(int j=0;j<9;j++)
     {   cin>>sudoku[i][j];  
        
     }
    

 }
 solvesudoku(sudoku,0,0,9);

}
    auto stop = high_resolution_clock::now();

    auto duration = duration_cast<microseconds>(stop - start);
  

cout << duration.count() << "\nfunction calls "<<f;
    return 0;
}