(async () => {
  const mockContent = async (data) => {
    const guid = await fetch(`/mock?data=${data}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    });
    return guid.text();
  };

  const getContent = async (guid) => {
    const resp = await fetch(`/?guid=${guid}`);
    return resp.text();
  };

  const myMockGuid = await mockContent('o meu mock');
  console.log(myMockGuid, await getContent(myMockGuid));
})();
