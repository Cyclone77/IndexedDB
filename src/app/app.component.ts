import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IndexedDB';

  ngOnInit(): void {
    // 数据库对象
    let db;
    // 打开数据库
    const request: IDBOpenDBRequest = indexedDB.open('Cy_IndexedDB');
    // success事件表示成功打开数据库。
    request.onsuccess = event => {
      db = request.result;
      console.log('数据库打开成功');

      const transwrite = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ name: '张三', age: 24, email: 'zhangsan@example.com' });

      transwrite.onsuccess = e => {
        console.log('数据写入成功', e);
      };

      transwrite.onerror = e => {
        console.log('数据写入失败', e);
      };

      const transread = db.transaction(['person'])
      .objectStore('person')
      .getAll();

      transread.onsuccess = e => {
        if (transread.result) {
          console.log(transread.result);
        } else {
          console.log('未获得数据记录');
        }
      };
    };

    // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
    request.onupgradeneeded = (event) => {
      db = event.target['result'];

      const objectStore = db.createObjectStore('person', { autoIncrement: true });
    };
  }
}
