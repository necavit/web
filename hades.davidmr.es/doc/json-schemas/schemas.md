# Hades API JSON Schemas #

All schemas defined here conform to the [JSONSchema specification](http://json-schema.org/).

## User ##

```javascript
{
  "$schema": "http://json-schema.org/draft-03/schema",
  "type": "object",
  "required": true,
  "properties": {
    "displayName": {
      "type": "string",
      "required": true
    },
    "lastPosition": {
      "type": "object",
      "required": true,
      "properties": {
        "coordinates": {
          "type": "array",
          "required": true,
          "items": {
            "type": "number",
            "required": true
          }
        },
        "type": {
          "type": "string",
          "required": true
        }
      }
    },
    "mail": {
      "type": "string",
      "required": true
    },
    "type": {
      "type": "string",
      "required": true
    }
  }
}

```