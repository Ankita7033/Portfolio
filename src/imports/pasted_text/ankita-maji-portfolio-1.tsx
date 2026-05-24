Build a fully glassmorphism-based 3D developer portfolio website for Ankita Maji.

The entire website must follow a layered glass UI aesthetic like modern Apple VisionOS / Linear / Raycast dashboards, similar to translucent floating panels over blurred backgrounds.

No solid flat sections allowed.

CORE DESIGN RULES (STRICT)

Follow these exactly:

Entire website must use glassmorphism
backdrop blur
transparency layers
soft borders
floating panels
depth shadows
Navigation must NOT scroll vertically

Instead:

Sections slide horizontally like pages in a desktop OS workspace

LOADING SCREEN

Before homepage loads show terminal boot animation:

Example:

Initializing portfolio kernel...
Mounting ML modules...
Connecting cloud pipelines...
Rendering UI workspace...
Welcome Recruiter.

Then transition into homepage workspace.

GLOBAL LAYOUT STRUCTURE

Website must feel like:

an operating system workspace

Layout:

floating navbar (glass)

center workspace panel (glass)

background animated gradient mesh

cursor glow effect

parallax depth layers

HOME PAGE DESIGN

Center of screen:

floating 3D glass card container

Inside:

3D placeholder for profile image

Below image:

Ankita Maji

Subtitle animated rotation:

Machine Learning Engineer
Systems Programmer
AI Platform Developer

Buttons (glass style):

View Projects
Download Resume
Contact Me

Background:

floating neural network nodes animation

PROJECT SECTION (MOST IMPORTANT PART — STRICT IMPLEMENTATION)

This section must contain a CENTERED floating VS CODE STYLE PANEL

Not full screen

Centered workspace window

Like:

Mac floating app window

Structure:

Left sidebar:

Explorer panel

Show project list:

DisasterGuard
MOSAIC
Diabetes Graph ML

Top bar:

VS Code styled title bar

with fake controls:

● ● ●

Main editor window:

When clicking project:

display:

Project description

AND

A 3D animated pipeline architecture visualization

Example pipeline:

API → Processing → ML Model → Database → Dashboard

This pipeline must animate:

flow arrows

node highlighting

data transitions

Use:

Three.js OR React Three Fiber

PROJECT PANEL EXTRA FEATURES

Inside editor window include:

Tabs like VS Code:

README.md
ARCHITECTURE.tsx
metrics.json

Clicking each tab changes content

README.md → description
ARCHITECTURE.tsx → animated pipeline
metrics.json → achievements stats visualization

Buttons bottom-right:

View GitHub

Live Demo

FULL SITE GLASSMORPHISM THEME RULES

Every section must use:

transparent cards

soft glow borders

blurred background layers

layered stacking depth

Example CSS style reference:

backdrop-filter: blur(25px)

border:

1px solid rgba(255,255,255,0.15)

shadow:

soft floating glow

NO flat containers anywhere

SKILLS SECTION DESIGN

Render floating glass tiles in 3D grid layout

Grouped:

Languages

ML Libraries

Platforms

Backend

Each tile rotates slightly on hover

Click opens popup stats modal

Include:

GitHub

HackerRank

GeeksforGeeks

WORK EXPERIENCE SECTION

Display timeline as floating holographic nodes

Connected using glowing animated lines

Timeline entries:

Machine Learning Intern — 1stop.ai

JPMorgan Software Engineering Simulation

Citi Technology Internship Simulation

Each opens expandable glass card

CERTIFICATIONS SECTION

Display floating badge cloud

Badges rotate slowly in 3D space

Click badge → opens certificate details panel

ACHIEVEMENTS SECTION

Animated counters inside floating glass widgets

Example:

500+ DSA problems solved

HackerRank ratings:

5⭐ Java
5⭐ Python
5⭐ C
5⭐ SQL
4⭐ C++

EDUCATION SECTION

Floating academic card

Display:

Lovely Professional University

B.Tech Computer Science Engineering

CGPA: 8.64

Animated graduation icon

CONNECT SECTION

Floating contact cards:

LinkedIn

GitHub

Email

Phone

Each card:

hover glow animation

copy-to-clipboard button

DARK MODE TOGGLE

Moon icon toggle button

Top-right corner

Transitions must animate smoothly

Glass panels adjust brightness automatically

PAGE TRANSITION SYSTEM

Between sections:

slide horizontally

NOT scroll

Like:

desktop workspace switching animation

Use:

Framer Motion transitions

BACKGROUND STYLE (IMPORTANT)

Background must stay consistent across entire site

Use:

animated gradient mesh

floating light particles

soft blur depth layers

No static backgrounds allowed

GLOBAL CHATBOT FEATURE

Persistent assistant:

JARVIS

Bottom-right floating glass bubble

When opened:

chat window slides upward

Jarvis answers:

projects

skills

internships

achivements

education

tech stack

architecture details

Example question support:

Explain MOSAIC scheduler

Explain DisasterGuard pipeline

What ML tools does Ankita use?

PERFORMANCE RULES

Lazy-load 3D elements

Mobile responsive glass layout

GPU optimized animations

Lighthouse score target > 90

FINAL EXPERIENCE TARGET

Website must feel like:

interactive engineering workspace

NOT

a scrolling portfolio website

Visitor experience goal:

Recruiter understands technical depth within 20 seconds