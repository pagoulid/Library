/**
 * @jest-environment jsdom
 */
import {replace,toggle,clearText} from '../src/scripts/modules/functions'
import {set_data_card_nodes} from '../src/scripts/modules/data'

 test('Toggle list of classNames#1 ', () => {
    const node=document.createElement('div')
    node.classList.add('name1')
    node.classList.add('name2')
    toggle(node,['name1','name2','name3','name4'])
    expect(node.className).toBe('name3 name4');
  });

  test('Toggle list of classNames#2 ', () => {
    const node=document.createElement('div')
    node.classList.add('name1')
    node.classList.add('name2')
    toggle(node,['name1','name2','name3','name4'])
    toggle(node,['name1','name2','name3','name4'])
    expect(node.className).toBe('name1 name2');
  });


  test('Replace classNames', () => {
    const node=document.createElement('div')
    node.classList.add('wrapper')
    node.classList.add('hidden')
    node.classList.add('element')
    replace(node,{primary:'hidden',replacement:'visible'})
    expect(node.className).toBe('wrapper visible element');
  });

  test('set values to input elements and reset them afterward', () => {
    const node1=document.createElement('input')
    const node2=document.createElement('input')
    const node3=document.createElement('input')
    
    set_data_card_nodes([node1,node2,node3],['It','Stephen King','500'])
    expect(node1.value).toBe('It')
    expect(node2.value).toBe('Stephen King')
    expect(node3.value).toBe('500')

    clearText([node1,node2,node3])
    expect(node1.value).toBe('')
    expect(node2.value).toBe('')
    expect(node3.value).toBe('')
    
  });
  


