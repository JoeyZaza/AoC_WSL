#include <string.h>
#include <stdio.h>

int check_for_num(char* c){
	int num = *c; //cast the char to its UTF-8 codepoint
	if(num < 48 || num > 57){
		return 0;
	} 
	else { 
		return 1;
	}
}

int main(void){
	FILE *fp;

	fp = fopen("/home/jojo3/aoc/input/2023/test.txt", "r");
	char line[1024];
	char* s = "jj33werojklbml84206989jflkjsj";
	int len = strlen(s);
	char arr[3];


	for(int i = 0; i < len; i++){
		char ch = s[i];


		if(check_for_num(&ch)){
			printf("%c\n", ch);
		}
	}





}
