---
title: Introduce MapReduce
date: 2024-08-31
categories:
  - Tech Article
tags:
  - DistributedSystem
  - MapReduce
draft: true
---
MapReduce论文在2004年发布，被看作*大数据*和*分布式系统*的起点，也是数据仓库和之后的流式系统（Streaming System）等很多数据产品的基石，很多编程语言也参考了其中的思想，比如Java `Streams` 中的`map`, `reduce`等，就利用了MapReduce可以**并行**处理数据的特点。非常流行的开源大数据框架*Hadoop*很多地方也都是基于MapReduce规范实现。

这篇文章是我在看了[MapReduce](https://research.google.com/archive/mapreduce-osdi04.pdf)论文和相关资料后做的一篇总结，可以帮助我们对其有更清晰的认识，另外工作中有一部分也与其相关，也加深一下自己的理解。

## 01/ 讲讲历史

在2000年期间，因为互联网用户人数增加和网速的提高，很多公司都面临单台机器无法满足提供有效服务和在合理时间内处理大批量数据的问题，这其中单纯堆单台机器的配置也不能满足要求，因为任何机器都不能保证一直可靠运行，磁盘也可能会出现故障，比如谷歌有段时间就认为采用更好的设备可以避免这个问题（结果当然是发现这样行不通），另外单台机器也很难匹配上当时增长的数据规模，因此，很多公司都不知不觉地走上了分布式系统的道路。

回到处理大规模数据这件事，我们的正常思路都是增加机器和增加磁盘来解决，问题在于如何把分布在不同机器上的执行过程和执行结果有效地组织在一起，一些解决方案会让整个系统很难维护，比如Hadoop的作者 Doug Cutting 在一开始时就曾遇到了这样的问题[1]。在那个时刻，Google刚好公开了它们在处理大规模数据时的解决方案，也就是MapReduce论文。

## 02/ 介绍MapReduce

MapReduce不是一个已经实现好的框架，而是一个编程模型或编程范式，Hadoop处理数据的部分就基于它实现，它将数据处理部分拆分为两个关键的阶段`map`和`reduce`，其命名参考了函数式编程语言Lisp。MapReduce一个非常好的方面是它非常容易理解和实现，用户在理解了它的处理过程后，只需要实现map和reduce函数，就可以构建自己的数据处理过程[2]，而且这两个函数的实现逻辑也都非常简单直白，一个函数只做一件事，这也很像Unix中对管道的使用[3]，这其中的容错处理（fault-tolerance）、数据读取和数据分组等等其它问题由框架层解决。

不过在使用MapReduce之前，需要有一个分布式文件系统，比如HDFS、GFS、盘古。

我们先看这两个函数的实现规范：
- map: `(k1,v1) -> list(k2,v2)`
- reduce: `(k2,list(v2)) -> list(v2)`

map做数据转置操作，reduce做数据聚合操作。map接收一块数据，输出一组已经转置过的Key-Value对，reduce对拥有相同key的数据做聚合操作。

我们来看一个经典的WordCount的例子，假如我们有一串文本（当然这串文本可以很大）：

```
The limits of my language mean the limits of my world
Premature optimization is the root of all evil
Keep it simple stupid
```
我们想要统计每个单词的出现次数（忽略大小写），对此我们可以使用3个相同的map函数分别处理每一行，得到的中间结果是：

```
-- map1 result
the 2
limits 2
of 2
my 2
language 1
mean 1
world 1

-- map2 result
premature 1
optimization 1
is 1
the 1
root 1
of 1
all 1
evil 1

-- map3 result
keep 1
it 1
simple 1
stupid 1
```


### 简单实现



MapReduce有3个非常显著的特点：
1. 并行化（Parallelization）：
2. 可扩展性（Scalability）：
3. 容错（Fault-tolerance）：

## 参考资料

1. [The history of Hadoop](https://medium.com/@markobonaci/the-history-of-hadoop-68984a11704)
2. 可以参考Hadoop中提供的一个[示例](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Overview)
3. *Designing Data-Intensive Applications* 中在批处理一节提到了管道和MapReduce设计思想的一些重合。