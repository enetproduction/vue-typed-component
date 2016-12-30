import * as Vue from "vue";
import { PropType } from "./types";
import * as po from "./propOptions";
export declare type VueClass<V> = (new () => V) & typeof Vue;
export declare type PropsDefinition<Props> = {
    [K in keyof Props]: Vue.PropOptions | PropType;
};
export declare type EventsObject<Events> = {
    emit: <K extends keyof Events>(event: K, arg: Events[K]) => any;
    on: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    once: <K extends keyof Events>(event: K, callback: (arg: Events[K]) => any) => any;
    off: <K extends keyof Events>(event: K, callback?: (arg: Events[K]) => any) => any;
};
export declare type ComponentOptions<V extends Vue, Props> = Vue.ComponentOptions<V> & {
    props: PropsDefinition<Props>;
};
export interface RenderContext<Props> extends Vue.RenderContext {
    props: Props;
}
export interface RenderFuncitonalComponent<Props> {
    (this: never, h: Vue.CreateElement, context: RenderContext<Props>): Vue.VNode;
}
export interface TypedComponentBase<Props> {
    $props: Props;
}
export declare class TypedComponent<Props> extends Vue {
    $props: Props;
}
export declare class EvTypedComponent<Props, Events> extends Vue {
    $props: Props;
    $events: EventsObject<Events>;
}
export declare abstract class StatefulTypedComponent<Props, Data> extends TypedComponent<Props> {
    $data: Data;
    abstract data(): Data;
}
export declare abstract class StatefulEvTypedComponent<Props, Events, Data> extends EvTypedComponent<Props, Events> {
    $data: Data;
    abstract data(): Data;
}
export interface ComponentDecorator {
    <P, V extends TypedComponentBase<P> & Vue>(options: ComponentOptions<V, P>): (target: VueClass<V>) => VueClass<V>;
}
export declare const component: ComponentDecorator;
export declare function functionalComponent<Props>(name: string, props: PropsDefinition<Props>, render: RenderFuncitonalComponent<Props>): VueClass<Vue>;
export declare namespace PropOptions {
    const Str: po.PropOptionBuilder<string, po.Default<string>, po.StringValidators>;
    const Num: po.PropOptionBuilder<number, po.Default<number>, po.NumberValidators>;
    const Bool: po.PropOptionBuilder<boolean, po.Default<boolean>, undefined>;
    const Func: po.PropOptionBuilder<(...args: any[]) => any, po.Supplier<(...args: any[]) => any>, undefined>;
    const Obj: po.PropOptionBuilder<{}, po.Supplier<{}>, undefined>;
    const Arr: po.PropOptionBuilder<any[], po.Supplier<any[]>, po.ArrayValidators>;
    const Any: po.PropOptionBuilder<null, any, undefined>;
    const ofType: typeof po.ofType;
}
