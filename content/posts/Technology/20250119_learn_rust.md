---
title: 阅读笔记：让我们讨论一下Rust
date: 2025-01-19
notetype: feed
categories:
  - Tech Article
tags:
  - Rust
draft: true
---
> 自己从24年9月份到现在陆陆续续把[The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html#the-rust-programming-language)看完了，这篇文章对知识点做一个回顾，方便记做一个里程碑。后面开始上手Rust项目，再查漏补缺阅读文档。

## 整体感觉

自己高中时学习Pascal、C++，大学时又额外学了Python（现在忘光了）、Java、Go（一点点）、Scala（一点点），实习时学了很多JavaScript和React（前端框架）。

~~现在讨论Rust。~~

~~Rust跟其他语言比起来很不一样，其他语言你会找到很多相似的地方，比如面向对象、语言的直白性/易上手性，C++和Java在面向对象方面的知识迁移成本不是很高，只是内存管理方面有些不同，它们所采用的方案也是很成熟的方案，Go和Python也都用了垃圾回收器（Garbage Collector），Rust所不同的是它采用了一个新的方案：既没有垃圾回收器，也不用开发者自己去分配内存。它提供了所有权（Ownership）和生命周期（Lifetime）来管理对象和自动释放对象，为此所带来的成本是开发者需要理解这些概念（或称作限制），通过编译器编译。我认为Rust学习成本高的原因主要便是需要学会和熟练运用这些规范。不过，这也带来了好处，**它的性能很好**。还有一个优点是新产品所共有的，那就是没有那么多负担和借鉴现有产品/语言的优良特性和设计以及解决存在的问题。Rust已经10年了，并且有越来越多的开发者和公司使用，它的评价一直都还不错，也变得越来越流行，总的来说，学习Rust的回报率绝对是正向的，且高于一般语言。~~

~~我把开发语言视作工具，好的工具事半功倍，每个语言有自己的设计思想和运行机制，站在高层看这种抽象，或是了解一些抽象，对地道地使用语言也是非常有帮助的。再者是熟练使用工具，掌握一些共性和原则后，人们会开始讨论*编程哲学*。一个功能的实现有很多种，好的设计让人发现和体会到一种美感，而绝大部分人都是喜欢美的，尽管粗糙的功能实现也能让系统运行。~~

~~还有再讨论一下学习成本，如果时间空闲，我认为一个半月可以学习到绝大部分的知识点，按小时估计，20 x 4 = 80小时，入门是足够了，不过相比于Python，可能40小时以下就够了。入门当然是略知皮毛，可以看的懂别人的代码，真正到熟练还是需要很久的项目实战练习，万事开头难，有兴趣的东西坚持下去并不难。~~

下面是关键知识点的讨论。

---

## TOC

我如此罗列：
1. 基础知识
	1. 变量和数据类型
	2. 控制流
	3. 枚举类和模式匹配
	4. 常用数据结构
2. Rust独有的内存管理知识
	1. 所有权
	2. 生命周期
	3. 智能指针
3. 面向对象
	1. 类和结构体
	2. 继承和接口
	3. 泛型和多态
4. 函数式编程
	1. 闭包
	2. 流式编程
5. 异常
6. 项目管理
	1. 测试
7. 并发
	1. 线程
	2. 消息通信
	3. 共享内存
8. 高级特性的简要讨论

## 01 基础知识

### 1.1 变量和数据类型

1. 变量默认不可变，想要让它可变需要加`mut`（mutable的缩写）。
2. 常量是`const`。
3. shadowing是指可以用相同变量名赋值，而且可以改变类型，这和mut变量是不同的，这个不能换类型。
4. `char`类型，Character，是4字节，而非C中的1字节。
5. Compound Type, like tuple `()` and array `[]`.
6. Functions / {Statements, Expressions}, statement doesn't return value, but expression do it.

### 1.2 控制流

1. Control Flow: `if`, `else if`, `loop`, `while`, `for`

### 1.3 枚举类和模式匹配

enum example:
```rust
enum Week {
    Monday,
    Thuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

enum IpAddr {
    V4(i8, i8, i8, i8),
    V6(String)
}

enum Object {
    Obj1(Rectangle),
    NewObj {
        is_fantastic: i32
    }
}
```

#### 神奇之处1：没有null

Rust提供`Option`，而不提供null。

模式匹配是`match`，非常酷，功能很强大，可以做到变量绑定。

### 1.4 常用数据结构

1. String 是 Vector[u8] 的特殊实现，Rust String 支持 UTF-8 编码，这意味着一个字符可能使用1-4个字节，所以你不能直接下标索引访问对应字符。另外一点是它做不到O(1)的字符访问，因为它必须遍历整个collection。
2. 结构体对象进入数据结构后，会发生 ownership move，我不确定来回的所有权移动是否会影响开发效率。

!!! finish exercises about [Common Collections](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)


## 02 Rust独有的内存管理知识

### 2.1 所有权

1. 一个堆对象需要有一个owner，当变量来回赋值，或是函数调用传参时，所有权也会发生变化。
2. 所有权的来回传递很麻烦，方便的做法是使用引用`&`，这和C++中很像，也就是一个地址，不过这里也要考虑所有权问题。
	1. 一个对象只能有一个可变引用或是多个不可变引用。
	2. 你做不到悬空引用，比如主对象已经被释放了，还有地方在引用它，Rust会让你编译不通过。
3. 字符串切片（String Slice）是对一个字符串中一段字符序列的引用，它和引用字符串比较相似，同样有所有权保障。

### 2.3 智能指针 Smart Pointer

1. `Box`
2. `Deref` and `DerefMut`: convert `&T` to `&U`
3. `Drop` and method `drop`
4. `Rc` that is *reference counting*
## 03 面向对象

### 3.1 类和结构体

1. Tuple Struct 可以不指定 field name，比如 `struct Color = (i32,i32,i32)`。

目前为止，结构体还很简单：
```rust
struct Rectange {
    width: usize,
    height: usize,
}

impl Rectange {
    fn struct_method(&self) -> usize {
        self.width * self.height
    }

    fn associated_method(other: &Rectange) -> usize {
        other.width * other.height
    }
}
```

有一点是toString（java中转为string格式），rust struct默认没有实现，需要的话可以实现 trait `std::fmt::Display`。或者，也可以 derive `Debug`。

```rust
#[derive(Debug)]
struct Rectange {
    width: usize,
    height: usize,
}
```

### 泛型

`fn function_name<T>`
`struct Name<T>`
`impl<X> Name<X>`
`impl<X> Name<X> { fn do<Y>() }` <- This is ok!

```rust
fn time<T>() -> T {

}
```
## 05 异常

1. `Result<T, E>`，`T` and `E` 是泛型，`Result` 是枚举类，包含 `Ok(T)` 和 `Err(E)`。
2. 错误上抛可以使用`?`运算符，避免重复的逻辑。
## 06 项目管理

1. 项目结构和`mod`, `use`, `as`, `pub use`.
