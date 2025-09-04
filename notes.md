



Here are 5 essential queries to test your ContentStack API properly in Postman:

## 1. **Basic Test - Get all pages**
```
GET http://localhost:3000/api/content?content_type=page
```
**Purpose:** Test if the basic connection works and see all available fields.

## 2. **Limit Results - Get only 3 pages**
```
GET http://localhost:3000/api/content?content_type=page&limit=3
```
**Purpose:** Test pagination and avoid large responses during testing.

## 3. **Get specific fields only**
```
GET http://localhost:3000/api/content?content_type=page&only=title,url,image
```
or if that doesn't work, try:
```
GET http://localhost:3000/api/content?content_type=page&fields=title,url,image
```
**Purpose:** Test if you can retrieve only specific fields you need.

## 4. **Get a single page by UID**
```
GET http://localhost:3000/api/content?content_type=page&entry_uid=YOUR_PAGE_UID_HERE
```
**Purpose:** Test retrieving a specific page (replace with actual UID from your first response).

## 5. **Get pages with include references**
```
GET http://localhost:3000/api/content?content_type=page&include=author,category
```
**Purpose:** Test including referenced content types (replace with your actual reference field names).

---


GET http://localhost:3000/api/content?content_type=page&entry_uid=YOUR_ENTRY_UID_HERE