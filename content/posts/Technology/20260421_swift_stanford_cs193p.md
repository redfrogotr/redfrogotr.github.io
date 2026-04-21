---
title: "From Zero to SwiftUI: Lessons from Stanford CS193p"
date: 2026-04-21
author: redfrogotr
tags:
  - iOS
  - tech
categories:
  - Tech Article
draft: false
---

## Retrospective

### Timeline

About one year ago, I planned to study iOS development. At that time, I was a backend and data development engineer. In 2024, I self-learned the Rust programming language by leveraging weekend time. Since the idea of building a personal project has always been on my mind, mastering iOS development seems like a natural *next* step. Over the past year, my learning has been intermittent. I failed to reach my goal until this year. I actually attempted to learn through the following resources:

1. [Apple official materials](https://developer.apple.com/tutorials/swiftui/creating-and-combining-views) about iOS development. Following every step from the official website, I built out a beautiful and modern app. However, I did not understand the meaning of every line of code. Eventually, I could not keep up with the study.
2. The [iOS APPS for Masterminds](https://www.formasterminds.com/ios_apps_for_masterminds_4th_edition/) book. This is about UIKit, not SwiftUI. I asked GPT, and it suggested me that learning UIKit is just as essential as SwiftUI. I think this book is great. Furthermore, staring at a digital screen for long reading sessions was exhausting for me. So I eventually abandoned my study plan.
3. [HackingWithSwift](https://www.hackingwithswift.com/100/swiftui), a highly acclaimed online course. I still failed to complete it.

Then, I decided to become an indie hacker, or a solo developer one month ago. Building an iOS app once again became my top priority. To ensure I could finally achieve this goal where I had failed before, I decided to sign up for online courses, such as those on [Coursea](https://www.coursera.org/learn/introduction-to-ios-mobile-application-development). After watching several free modules, it failed to spark my interest. I asked myself, *how about the free course?* Finally, I got this Stanford CS193p course. I really enjoy the professor's teaching style. And I managed to finish the entire course. 

To be honest, I don’t think the whole process is very long. I spent nearly one month on this journey. After deducing travel breaks (roughly 10 days), my actual study time added up to 18 days. Studying around 5 hours each day, the total learning time reached 90 hours —— a relatively short period.

## Is it worth learning iOS development in AI era?

I admit modern AI programming tools are extremely powerful. Total beginners can build fully functional personal apps simply through natural language prompts. In 2026, it is entirely possible to ship an iOS app without learning native development at all. That said, I have always been fascinated by user interaction design. If I can control every UI component and every interaction by coding, I definitely will gain a strong sense of accomplishment. Even if it never turns into a full-time gig, I know it's still be a fun hobby to have.

## Real features about this course

 This course includes 16 lectures, which is about 110 minutes. This way is very similar to the common way of taking one class since I am a kid. So it’s more acceptable for me. The content of this course is more special than normal university course (Stanford University really deserves its fame). It’s more challenging but continuous about every knowledge point. The whole result lets me feel so rewarding.

Come back to the structure of this course. It is really well-organized. This is the module order:

1. Xcode IDE (for building iOS app).
2. UI and Swift basics.
3. MVVM development pattern and Model.
4. Data flow, animation, protocol.
5. Persistence (SwiftData), navigation, extensibility (from iPhone to iPad).
6. Concurrency, then final project.

The instructor doesn’t just list every knowledge point that will be very boring. He introduces a project/game called *CodeBreaker.* As the course proceeds, the game becomes more and more beautiful and playful, especially in Animation section. This way engages me into the studying process.

## Some new features I learned as a backend engineer

I said I am a backend engineer and data development engineer. I have learnt frontend development like React, JavaScript. I know JavaScript is very flexible (sometimes too flexible), but I am not comfortable to it. Swift is different. The code written by Swift is dependable for me, and I think Swift language is much more concise than Java (I actually have used Java for 3 years). Look back Java, I feel its grammar is very bloated now. 

It’s common in 2026 for a programming language can do automatic memory management. Java can do it by GC, Python uses reference counting (RC) and GC, Rust uses ownership that is very cool and hard to master. Swift also supports it by ARC (Automatic Reference Counting). It’s good, so programmers can focus on key features of applications.

### New UI for a backend engineer

As a backend engineer, I only need to care about system performance and data consistency. To some extent, it’s more abstract compared to mobile development and frontend development, because I just focus on request data, concurrency problem, interaction with database, and system performance. I don’t care what the user sees and whether its style is aesthetic and smooth. But iOS development engineer and frontend engineer care about it. As for me, I like iOS development because I really want to create some tangible products. I can get immediate feedback every time I change one line of code. I like this feeling.

The way of controlling style in Swift is different from in frontend, which use HTML and CSS. How about drawing a button in frontend way? 

Like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Styled Button</title>
    <style>
        /* Core button style */
        .custom-btn {
            /* Size */
            padding: 12px 24px;
            font-size: 16px;
            
            /* Color */
            /* Shape */
            /* Cursor & interaction */
            /* Text */
            font-weight: 600;
        }

        /* Hover effect (when mouse is over) */
        .custom-btn:hover {
            background-color: #1d4ed8; /* Darker blue */
            transform: translateY(-2px); /* Lift up */
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        /* Click effect */
        .custom-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }
    </style>
</head>
<body>
    <!-- The button -->
    <button class="custom-btn">Click Me</button>
</body>
</html>
```

Of course, we can use some frameworks like React or Vue.

How about Swift?

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Button(action: {
            print("Custom button tapped!")
        }) {
            // Button content (text)
            Text("Custom Button")
                .font(.headline) // Font size
                .fontWeight(.semibold) // Bold
                .foregroundColor(.white) // Text color
        }
        // Button style modifiers
        .padding(.horizontal, 24) // Left/right padding
        .padding(.vertical, 12) // Top/bottom padding
        .background(Color.blue) // Background color
        .cornerRadius(10) // Rounded corners
        .shadow(radius: 3) // Soft shadow
    }
}
```

My personal feeling is that Swift is more compact and well-organized in which every view modifier is defined clearly in the document, yet HTML and CSS is loose and scattered, or flexible if changing expressing aspect. Swift doesn’t use angle brackets (`<`, `>`) a lot, only in generics. But angle brackets are common in HTML.

I know MVC but not MVVM. Now, I know it. Design pattern / project architecture is important. Separating View layer from Control layer will reduce development burden a lot because mixing much stuff together only result in chaos.

Data flow is a new concept for me. In Java and C++, we know access control between different objects by access modifiers like `private` and `public`. Once involving UI, data transferring problem will occur because model data controls UI refreshing, but different UI component cannot know the data change of other components directly. So we need components to be observable and we need data binding. Swift uses `@State`, `@Binding` , and `@Observable`. I know *Redux* in React for frontend development. 

When approaching to *SwiftData*, it starts to become hard. Mobile development also needs database though it can transfer this responsibility to backend side. If mobile side can operate data directly, it will be more handy. Of course, using file to save data is feasible but not very convenient. SwiftData is used to undertake this responsibility. It is really like a tiny database that stores data on the phone’s disk. Programmer just needs to conform to some rules.

In the last, I want to talk about *Animation*. It is pretty cool for me. The Animation makes me feel that the app is alive. When a component disappears and appears, it doesn’t do it directly. I can see the whole process of change. However, I admit it is difficult when multiple animations are put together. Yes, I need to know more details to control them proficiently.

## In the end

Completing this course is just my first step into iOS development. With AI tools at hand, I can learn and build much faster than before. Every tiny change might be the turning point of my life trajectory. If I am interested in one thing, learning more about it is always far better than remaining stagnant. I don’t need to put limitation on myself.