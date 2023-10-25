# Python

## variables

python 没有特殊符号定义类型，属于动态创建类型

```python
a = 20
b = input(‘please input a value’)
```



## Functions

使用 def 关键字，没有 parentheses 包裹，全靠 indentation 来控制函数 scope

```python
def func:
  print(‘hello world’)
```



## Calculation

\+ - \* / % 五大基本运算

平方计算：[pow(number)] [number**2]

**注意：只有数字类型可以进行运算！字符串需要进行格式转换！**

```python
def main():
  mass = int(input('m: '))	// 此处必须用int或者float包一下，不然会报错！
  calcEnergy(mass)

def calcEnergy(m):
  energy = m * pow(300000000, 2)
  return print(energy)

main()
```



## Common Used Methods

**print(text1, text2, …, sep=“, ”)**

控制台打印方法，接收 sep 参数作为不同 text 之间的连接符

**int()**

字符串转数字，python 不具有隐式转换

**strip()**

消除字符串两端的空格

**f”{variable: .nf}”**

字符串格式化，保留 n 位小数,eg: f”{result: .2f}”, 13.22

**f”{variable: ,.nf}”**

字符串格式化，保留 n 位小数，并带逗号格式话,eg: f”{result: ,.2f}”, 13,333.22

**round(number, [digits])**

格式化 number 为 digits 位小数，如果不填 digit，则返回四舍五入后的整数，如果 digit 填 0，还是会返回 xx.0 的浮点数

**range(number)**

给定一个数字，用于生成一个 number 长度的数组

**string.lower()**

转换成小写

**string.upper()**

转换成小写

**len(array)**

获取一个数组的长度

**char.isdigit()**

判断某个字符是否为数字

**char.isalpha()**

判断某个字符是否为字母

**string.startswith()**

判断是否某字符串开头

**string.endswith()**

判断是否某字符串结尾

**string.zfill()**

自动补零，例如 str(9).zfill(2) == ’09’ capitalize()

**string.capitalize()**

字符串首字母大写，例如’string’.capitalize() == ‘String’



## Main function

Python 不具有变量提升的特点，定义在后面的函数在前面使用的话会报错，故而需要定义 main, 在最后调用，确保函数调用不出错

```python
def main:
	inputValue = input(‘say something please: ’)
	getHello(inputValue)

def getHello(v):
	return print(f`Hello ${v}`)

main()
```



## **列表生成式**

结构 [expression for element in iterable if condition]

eg1: [x * 2 for x in range(5)] —> [0, 2, 4, 6, 8]

eg2: [x+'1' for x in 'balala'] —> ['b1', 'a1', 'l1', 'a1', 'l1', 'a1']

搭配上’’.join()使用，可以拼接字符串，例如上例第二点，‘’.join(x+’1’ for x in ‘’balala’) —> ‘b1a1l1a1l1a1’

还可以搭配限制条件 ‘’.join(x+’1’ for x in ‘’balala’ if x == a) —> 'a1a1'

**注意，expression 和 element 中的变量名要一致！例如，不能写 [ y for x in list ]**



## Conditions

### if

Python 可以用运算连写，例如 grade >= 90 and grade <=100，可以直接写成 90 <= grade <= 100

```python
def is_right(answer):
  formatted_answer = answer.strip().lower()
  if formatted_answer == '42' or formatted_answer == 'forty-two' or formatted_answer == 'forty two':
    return 'Yes'
  else:
    return 'No'
```

**注意，python 中没有‘||’ (或)的关键字，必须使用 or**

### if in

**if item in item_dic:**

If in 关键字，判断某项是否在某个字典中有值

### match

Python 中的 match 就是其他语言中的 switch!
