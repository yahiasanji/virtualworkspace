# WorkSphere Staff Management

A web application for visual and interactive personnel management within office spaces.

## Overview

WorkSphere allows managers to organize and distribute employees across a floor plan in real-time, with role-based access controls for different zones.

## Features

- Visual floor plan with 6 distinct zones (Conference Room, Reception, Server Room, Security Room, Staff Room, Archives)
- Role-based access restrictions
- Employee profile management (name, role, photo, email, phone, work experience)
- Unassigned staff list with quick assignment options
- Detailed employee profiles with full information display
- Capacity limits per zone
- Visual indicators for empty restricted zones
- Responsive design for desktop, tablet, and mobile devices

## Zone Access Rules

- Reception: Receptionists only
- Server Room: IT Technicians only
- Security Room: Security Agents only
- Manager: Access to all zones
- Cleaning Staff: All zones except Archives
- Conference Room and Staff Room: Open to all roles
- Other roles: Free access except to restricted zones

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, animations)
- Vanilla JavaScript
- Responsive design 


## Project Structure

```
worksphere-virtualworkspace/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Responsive Breakpoints

- Desktop Large: > 1280px
- Desktop Small: 1024px - 1279px
- Tablet: 768px - 1023px
- Mobile: < 767px

## Validation

Code validated with W3C HTML and CSS validators.
