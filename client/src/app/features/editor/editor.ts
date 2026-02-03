import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';

@Component({
  selector: 'app-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor implements AfterViewInit, OnDestroy {
  @ViewChild('editor') editorHost!: ElementRef;

  private editorView?: EditorView;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initEditor();
  }

  private initEditor() {
    this.ngZone.runOutsideAngular(() => {
      const state = EditorState.create({
        doc: '# Bem-vindo ao Flint\n\nComece a escrever...w',
        extensions: [
          keymap.of([...defaultKeymap, indentWithTab, ...historyKeymap]),
          history(),
          markdown(),
          EditorView.lineWrapping,
        ],
      });

      this.editorView = new EditorView({
        state: state,
        parent: this.editorHost.nativeElement,
      });
    });
  }

  ngOnDestroy() {
    this.editorView?.destroy();
  }
}
