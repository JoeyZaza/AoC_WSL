#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int check_for_num(char* c){
	int num = *c; //cast the char to its UTF-8 codepoint
	if(num < 48 || num > 57){
		return 0;
	} 
	else { 
		return 1;
	}
}



int return_num(char* c){
	char c0 = c[0];
	char c1 = c[1];

	int n0 = c0 - '0';
	int n1 = c1 - '0';

	n0 = n0 * 10;

	int new = n0 + n1;
	return new;
}


char *return_string(char* line, char* ret){
	int len = strlen(line);
	int bool = 0;
	int bool2 = 0;
	
	for(int i = 0; i < len; i++){
		char ch = line[i];
		if(check_for_num(&ch) && !bool){
			ret[0] = line[i];
			bool = 1;

		}
		else if(check_for_num(&ch) && bool){
			ret[1] = line[i];
			bool2 = 1;
		}
		

	}
	if(!bool2){
		ret[1] = ret[0];
	}
	return ret;
}


int main(void){
	FILE *fp;

	fp = fopen("/home/jojo3/aoc/input/2023/day1.txt", "r");
	char line[1024];

	int count = 0;
	int line_count = 0;
	while(fgets(line, sizeof line, fp) != NULL){
		char s[2];
		char* newstr = return_string(line, s); 

		int newnum = return_num(newstr);

		printf("newnum: %d\n", newnum);

		count += newnum;
		line_count++;
		printf("line_count: %d\n", line_count);
	}

	printf("Final count: %d\n", count);

	//fgets(line, sizeof line, fp);

	//int len = strlen(line);

	//char array[2];
	
	//char* new = return_array(array, line);
	//int new_num = return_num(new);
	//printf("new_num: %d\n", new_num);

	fclose(fp);
}
