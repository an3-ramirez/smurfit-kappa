import { AfterViewInit, Component, OnInit, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  public context!: CanvasRenderingContext2D;
  public innerWidth: any;
  public innerHeight: any;

  //* Cube Properties

  @Input() x!: number;
  @Input() y!: number;
  @Input() z!: number;
  @Input() public texture: string = "/assets/fondo-de-textura-cartón-marrón.jpg";
  
  public rotationSpeedY: number = 0.01;
  public rotationSpeedX: number = 0.01;


  //* Stage Properties
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 75;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  constructor() {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth * 0.64;
    this.innerHeight = window.innerHeight * 0.80;
  }

  ngOnChanges(changes: SimpleChanges): void {
      //this.geometry = new THREE.BoxGeometry(this.x, this.y, this.z);

  }

  ngAfterViewInit() {
    console.log('start after');
    this.createScene();
    this.startRenderingLoop();
  }

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(150, 100, 200);
  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   *Animate the cube
   *
   * @private
   * @memberof CubeComponent
   */
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5dc)
    this.scene.add(this.cube);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    console.log('radio: ', aspectRatio);
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

}
