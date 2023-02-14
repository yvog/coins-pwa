### Numista Swap Lists - feature suggestion

1. For now we can keep the JSON-file as single source of truth (it can be generated dynamically by using the Numista API).

2. We need to make sure every coin in the JSON-file, which is available for swap, contain the following properties:

```
"numistaCoinTypeId": "id1"
"numistaCoinIssueId" "id2"
"swap": true
```

3. We need a 'Sync Swappables' button which uses the Numista API to upload the swappable coins from the JSON-file to a Numista collection

4. Start swapping coins
