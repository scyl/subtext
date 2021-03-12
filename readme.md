# Subtext search

A GraphQL server on node.js that (at the moment) allow searching of a list of subtexts from a string.

## Query

Example query to do subtext search

```javascript
query subtextSearch {
  text {
    subtextSearch{
      text
      subtexts
      results {
        subtext
        result
      }
    }
  }
}
```

## Mutation

Example mutation to submit subtext search result

```javascript
mutation submitResult {
  text {
    subtextSearchAndSubmit {
      submitted {
        candidate
        text
        results {
          subtext
          result
        }
      }
      response
    }
  }
}
```