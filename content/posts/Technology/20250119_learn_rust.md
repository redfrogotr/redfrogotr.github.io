---
title: Rust 学习感受
date: 2025-03-16
notetype: feed
categories:
  - Tech Article
tags:
  - Rust
draft: false
---
> 这篇文章拖了很久，我准备写，然后每周都在拖延，我从24年9月份到现在陆陆续续把[The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html#the-rust-programming-language)看完了，我最初打算写一篇 Rust 学习总结的笔记，但是因为时间线拉的太长，很多知识点已经记不清了，回过头再学一遍的意义并不大，所以，我把要求放低，只打算写一篇个人感受的文章，将其视作里程碑，也准备开始下一阶段的学习。

## 整体感受

我学 Java 时没有很大的冲击感，了解到 Spring 框架时才感觉到一点神奇。我高一开始学习编程，学的第一门编程语言是 Pascal，后面切换到 C++ 上，当时只是调一些算法库，并没有学面向对象这些。

接着是大学开始正式学习软件工程（我的专业），学 C 和 C++ 没有很费劲，看看书都明白了。大一暑假学习 Python，了解到新的编程方式，语言很灵活，数据类型也很多，很快就能上手。大学还学了一点点汇编、SQL 和 Go，以及实习的时候学了 JavaScript 和 React 框架。

总的来说，学 Rust 的感受很不一样，它跟其它语言都不一样，让人耳目一新。最独特的，就是**所有权（Ownership）** 和**生命周期（Lifetime）**，我觉得这是它和其它语言最主要的区别，另外，因为它是一门比较新的语言，它避免了一些其它语言设计的问题，比如 `null` 值，Rust 中没有它，而是以 `Option` 包装类型代替，以避免 Java 中经常出现的空指针问题。

接着是 Rust 最常宣扬的——性能。👆提到的特性归根结底为了服务一件事：**内存管理**，C++ 中使用对象前需要先*分配内存*，然后在不使用时*释放*掉它，内存交由开发者自己管理总会因为疏漏出现问题，比如忘记回收，或是重复释放。另外一种使用内存的方式是内存统一由系统分配，然后由系统定时回收（Java 中叫做垃圾回收器 / Garbage Collector），开发者只需专注到自己的业务逻辑，比较典型的就是 Java，但这样做遇到的问题是这会牺牲掉一部分系统性能，Java 中的 FullGC 对系统影响会更为明显。Rust 选择了一条不一样的路：**它做到了自动内存管理（即不由开发者来申请），同时也避免使用垃圾回收器**。它是如何做到的呢？答案是**生命周期**。

事实上，每个变量都会存在一个隐式的生命周期，只有在编译器无法推断出的时候，生命周期才需要显式指定。一般而言，变量的生命周期是在 `{}` 的结尾，比如：
```rust
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+
```

这样则不行：
```rust
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+
```

```bash
$ cargo run
   Compiling chapter10 v0.1.0 (file:///projects/chapter10)
error[E0597]: `x` does not live long enough
 --> src/main.rs:6:13
  |
5 |         let x = 5;
  |             - binding `x` declared here
6 |         r = &x;
  |             ^^ borrowed value does not live long enough
7 |     }
  |     - `x` dropped here while still borrowed
8 |
9 |     println!("r: {r}");
  |                  --- borrow later used here

For more information about this error, try `rustc --explain E0597`.
error: could not compile `chapter10` (bin "chapter10") due to 1 previous error

```

当变量达到了生命周期之外，就像是生命的尽头，它们会被回收掉，而不需要定时回收。这样便不会有什么垃圾管理器的负担了。

另外是 Rust 同样支持函数式编程（Functional Programming），据文档所说，性能还不错。以及面向对象编程，只是使用方式有些不同，这方面我还没有了解很深。

## 知识点讨论

### 基础知识

1. 变量默认不可变，想要让它可变需要加 `mut`（mutable的缩写）。
2. `char` 类型，Character，是4字节，而非C中的1字节。
3. Compound Type, like tuple `()` and array `[]`.
4. Rust提供 `Option`，而不提供null。
5. 模式匹配是`match`，非常酷，功能很强大，可以做到变量绑定。
6. String 是 Vector[u8] 的特殊实现，Rust String 支持 UTF-8 编码，这意味着一个字符可能使用1-4个字节，所以你不能直接下标索引访问对应字符。另外一点是它做不到O(1)的字符访问，因为它必须遍历整个collection。
2. 结构体对象进入数据结构后，会发生 ownership move，我不确定来回的所有权移动是否会影响开发效率。

### 内存管理

1. 一个堆对象需要有一个owner，当变量来回赋值，或是函数调用传参时，所有权也会发生变化。
2. 所有权的来回传递很麻烦，方便的做法是使用引用`&`，这和C++中很像，也就是一个地址，不过这里也要考虑所有权问题。
	1. 一个对象只能有一个可变引用或是多个不可变引用。
	2. 你做不到悬空引用，比如主对象已经被释放了，还有地方在引用它，Rust会让你编译不通过。
3. 字符串切片（String Slice）是对一个字符串中一段字符序列的引用，它和引用字符串比较相似，同样有所有权保障。

### 异常

1. `Result<T, E>`，`T` and `E` 是泛型，`Result` 是枚举类，包含 `Ok(T)` 和 `Err(E)`。
2. 错误上抛可以使用`?`运算符，避免重复的逻辑。
### 项目管理

1. 项目结构和`mod`, `use`, `as`, `pub use`.
2. 使用 Cargo 和 [crates.io](https://crates.io/)

---
这便是全部我认为值得说的☺️。